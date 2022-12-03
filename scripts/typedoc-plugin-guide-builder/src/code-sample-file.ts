import assert = require('assert');
import fs = require('fs');

export const DEFAULT_BLOCK_NAME = '__DEFAULT__';
const REGION_REGEX = /^[\t ]*\/\/[\t ]*#((?:end)?region)(?:[\t ]+(.*?))?$/gm;

export const getCoordinates = (
  content: string,
  position: number
): { line: number; column: number } => {
  const beforeContent = content.slice(0, position);
  const lines = beforeContent.split('\n');
  return { line: lines.length, column: lines[lines.length - 1].length + 1 };
};

export interface ICodeSample {
  region: string;
  file: string;
  code: string;
  startLine: number;
  endLine: number;
}

interface IRegionMarkerBase {
  fullMatch: string;
  line: number;
  type: 'start' | 'end';
  name?: string;
}
interface IStartRegionMarker extends IRegionMarkerBase {
  type: 'start';
  name: string;
}
interface IEndRegionMarker extends IRegionMarkerBase {
  type: 'end';
}
type RegionMarker = IStartRegionMarker | IEndRegionMarker;

const parseRegionMarker =
  (fileContent: string) =>
  (match: RegExpMatchArray): RegionMarker => {
    assert(typeof match.index === 'number', new Error('Missing index'));
    const type = match[1].toLocaleLowerCase() === 'region' ? 'start' : 'end';
    const name = match[2];
    assert(type !== 'start' || name, new Error('Missing name of start `#region`'));
    const location = getCoordinates(fileContent, match.index);
    return { ...location, type, name, fullMatch: match[0] };
  };

const assembleStartEndMarkers = (
  prevMarkers: Array<{ open?: IStartRegionMarker; close?: IEndRegionMarker; name: string }>,
  marker: RegionMarker
) => {
  if (marker.type === 'start') {
    assert(
      !prevMarkers.find((r) => r.name === marker.name),
      new Error(`Region ${marker.name} already exists`)
    );
    prevMarkers.push({
      open: marker,
      name: marker.name,
    });
  } else {
    // End marker
    // eslint-disable-next-line no-lonely-if
    if (marker.name) {
      const openRegion = prevMarkers.find((r) => r.name === marker.name);
      assert(openRegion, new Error(`Missing region ${marker.name} explicitly closed`));
      assert(!openRegion.close, new Error(`Region ${marker.name} already closed`));
      openRegion.close = marker;
    } else {
      const lastNotClosed = prevMarkers
        .concat()
        .reverse()
        .find((r) => !r.close);
      assert(lastNotClosed, new Error('Missing implicitly closed region'));
      assert(!lastNotClosed.close, new Error(`Region ${lastNotClosed.name} already closed`));
      lastNotClosed.close = marker;
    }
  }
  return prevMarkers;
};

interface IRegion {
  open: IStartRegionMarker;
  close: IEndRegionMarker;
  name: string;
}

const addRegionInSet =
  (file: string, contentLines: string[]) =>
  (regionsMap: Map<string, ICodeSample>, { open, close, name }: IRegion) => {
    const code = contentLines
      .slice(open.line, close.line)
      .filter((l) => !l.match(REGION_REGEX))
      .join('\n');
    regionsMap.set(name, {
      file,
      region: name,
      endLine: close.line,
      startLine: open.line,
      code,
    });
    return regionsMap;
  };

export const readCodeSample = (file: string): Map<string, ICodeSample> => {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');
  const regionMarkers = [...content.matchAll(REGION_REGEX)];

  if (regionMarkers.length === 0) {
    return new Map([
      [
        DEFAULT_BLOCK_NAME,
        {
          file,
          region: DEFAULT_BLOCK_NAME,
          code: content,
          endLine: lines.length,
          startLine: 1,
        },
      ],
    ]);
  }

  return (
    regionMarkers
      .map(parseRegionMarker(content))
      .reduce(assembleStartEndMarkers, [])
      // Check validity of regions
      .map<IRegion>((r) => {
        assert(
          r.open && r.close,
          new SyntaxError(`Region ${r.name} is not properly opened & closed`)
        );
        assert(
          r.open.line < r.close.line,
          new SyntaxError(
            `Region ${r.name} is closed before being opened. Opened at line ${r.open.line}, closed at line ${r.close.line}`
          )
        );
        return r as IRegion;
      })
      .reduce(addRegionInSet(file, lines), new Map<string, ICodeSample>())
  );
};
