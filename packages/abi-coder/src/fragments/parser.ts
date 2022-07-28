import { abiLogger, checkModifier, verifyType } from './helpers';

// AST Node parser state
export type ParseState = {
  allowArray?: boolean;
  allowName?: boolean;
  allowParams?: boolean;
  allowType?: boolean;
  readArray?: boolean;
};
// AST Node
export type ParseNode = {
  parent?: ParseNode;
  type: string;
  name?: string;
  state?: ParseState;
  indexed?: boolean;
  components?: Array<ParseNode>;
  typeArguments?: Array<ParseNode>;
};

export function parseParamType(param: string, allowIndexed: boolean): ParseNode {
  const singleLineParam = param.replace(/\s/g, ' ');

  function throwError(i: number) {
    abiLogger.throwArgumentError(`unexpected character at position ${i}`, 'param', singleLineParam);
  }

  function newNode(parent: ParseNode): ParseNode {
    const node: ParseNode = { type: '', name: '', parent, state: { allowType: true } };
    if (allowIndexed) {
      node.indexed = false;
    }
    return node;
  }

  const parent: ParseNode = { type: '', name: '', state: { allowType: true } };
  let node = parent;

  singleLineParam.split('').forEach((_char: string, i: number) => {
    const c = singleLineParam[i];
    switch (c) {
      case '(':
        if (node.state?.allowType && node.type === '') {
          node.type = 'tuple';
        } else if (!node.state?.allowParams) {
          throwError(i);
        }
        if (node.state) {
          node.state.allowType = false;
        }
        node.type = verifyType(node.type || '');
        node.components = [newNode(node)];
        node = node.components[0];
        break;

      case ')':
        delete node.state;

        if (node.name === 'indexed') {
          if (!allowIndexed) {
            throwError(i);
          }
          node.indexed = true;
          node.name = '';
        }

        if (checkModifier(node.type || '', node.name || '')) {
          node.name = '';
        }

        node.type = verifyType(node.type || '');

        // eslint-disable-next-line no-case-declarations
        const child = node;
        node = node.parent as ParseNode;
        if (!node) {
          throwError(i);
        }
        delete child.parent;
        if (node.state) {
          node.state.allowParams = false;
          node.state.allowName = true;
          node.state.allowArray = true;
        }
        break;

      case ',':
        delete node.state;

        if (node.name === 'indexed') {
          if (!allowIndexed) {
            throwError(i);
          }
          node.indexed = true;
          node.name = '';
        }

        if (checkModifier(node.type || '', node.name || '')) {
          node.name = '';
        }

        node.type = verifyType(node.type || '');

        // eslint-disable-next-line no-case-declarations
        const sibling: ParseNode = newNode(node.parent as ParseNode);
        // { type: "", name: "", parent: node.parent, state: { allowType: true } };
        node?.parent?.components?.push(sibling);
        delete node.parent;
        node = sibling;
        break;

      // Hit a space...
      case ' ':
        // If reading type, the type is done and may read a param or name
        if (node.state && node.state.allowType) {
          if (node.type !== '') {
            node.type = verifyType(node.type || '');
            delete node.state.allowType;
            node.state.allowName = true;
            node.state.allowParams = true;
          }
        }

        // If reading name, the name is done
        if (node.state?.allowName) {
          if (node.name !== '') {
            if (node.name === 'indexed') {
              if (!allowIndexed) {
                throwError(i);
              }
              if (node.indexed) {
                throwError(i);
              }
              node.indexed = true;
              node.name = '';
            } else if (checkModifier(node.type || '', node.name || '')) {
              node.name = '';
            } else {
              node.state.allowName = false;
            }
          }
        }

        break;

      case '[':
        if (!node.state?.allowArray) {
          throwError(i);
        }

        node.type += c;

        if (node.state) {
          node.state.allowArray = false;
          node.state.allowName = false;
          node.state.readArray = true;
        }
        break;

      case ']':
        if (!node.state?.readArray) {
          throwError(i);
        }

        node.type += c;

        if (node.state) {
          node.state.readArray = false;
          node.state.allowArray = true;
          node.state.allowName = true;
        }
        break;

      default:
        if (node.state?.allowType) {
          node.type += c;
          node.state.allowParams = true;
          node.state.allowArray = true;
        } else if (node.state?.allowName) {
          node.name += c;
          delete node.state.allowArray;
        } else if (node.state?.readArray) {
          node.type += c;
        } else {
          throwError(i);
        }
    }
  });

  if (node.parent) {
    abiLogger.throwArgumentError('unexpected eof', 'param', param);
  }

  delete parent.state;

  if (node.name === 'indexed') {
    if (!allowIndexed) {
      throwError(param.length - 7);
    }
    if (node.indexed) {
      throwError(param.length - 7);
    }
    node.indexed = true;
    node.name = '';
  } else if (checkModifier(node.type || '', node.name || '')) {
    node.name = '';
  }

  parent.type = verifyType(parent.type || '');

  return parent;
}
