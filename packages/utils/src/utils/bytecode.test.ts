import { arrayify } from './arrayify';
import { compressBytecode, decompressBytecode } from './bytecode';

/**
 * We are using a base64 encoded bytecode here to avoid having to
 * read the file from disk. This is because we cannot read files
 * from the filesystem in a browser testing environment.
 */
const bytecodeBase64 =  'GvAwAHQAAAIAAAAAAAAEgF3/wAEQ//8AdAAAABrsUACRAAIYXVPwAhBRQMAaQGAAckQCUBBBBEAa6QAAIPgzAFj74AJQ++AEdAAAyRpD0ABQR7AQX+0AAlBDsbBySAAIKEEUgBpAYAByRAJIEEEEQBrpAAAg+DMAWPvgAlD74AR0AAC7GkPQAFBHsFBf7QAKUEOx2HJIAAgoQRSAUEOx2F1HsDtdRRAAXUuwO3JMAAgQSSTAX+0gO1BLsChyTAAIKEkEwF/tEAZQQ7IIckwAEChBJMBdQ7A7EEEEQF/tADtQQ7IIUEux+HJMABAoSQTAUEOx+FBLsUByTAAQKEkEwBrpIAAg+DMAWPvgAlD74AR0AACiGkPQAFBLsBhf7QADX+0QBFBDsbhyRAAQKEEkQFBDsbhf7UAAckQADV/tEAFQR7CYckgAEChHtIBQS7FgckwAEChJBMAa6SAAIPgzAFj74AJQ++AEdAAAnBpL0ABQT7FwclAAEChNFQAa6TAAIPgzAFj74AJQ++AEdAAAkxpP0AATSSTAE0kgABpMAAB2SAAcUEuxkHJMABAoSQTAGukgACD4MwBY++ACUPvgBHQAAJYaS9AAUE+xoHJQABAoTRUAGukwACD4MwBY++ACUPvgBHQAAI0aR9AAUE+xgHJQABAoTQUAGukwACD4MwBY++ACUPvgBHQAAHQaQ9AAKU0kUHZMAAF0AABTIPgzAFj74AJQ++AEdAAAjBpL0AByQAQAJkAAABpAcABQR7BwX+0ADnJABABf7QAPX+wAEFBDsKhyTAAYKEEUwFBHsQByTAAYKEUEwFBDsDhyTAAYKEEUwF1DsAddU7AIXU+wCRBFMEAVRRUAdkQAAXQAAAVyRAACG1FEQCZQAAAoHQTAGkBwABBFBMBeRSAAEEUwQFBLsMBf7QAYX+1AGV/tEBpQQ7DockQAGChBJEBQR7HgckgAGChFBIBQQ7HgUEexGHJIABgoRQSAUEOwWHJIABgoQRSAXUewC1BBABBQS7DYX+0QG1BFIAhyTAAIKEUEwFBDschyRAAQKEEkQFBDschQR7FQckgAEChFBIAa6RAAIPgzAFj74AJQ++AEdAAAFxpD0ABQR7HIUEuxMHJMABAoSRTAUEewiHJMABAoRSTAXUewEiVBEAByQAB7NkAAAJUAAAOWCAAAGuxQABpDoAAaR+AAXUEAABr1AAAa+RAAmAgAAJcAAANK+AAAlQAAB5YIAAAa7FAAkQAAEBpDoAAaR+AAckgAECjtBIAaQ7AAXUEAABr1AACSAAAQGvkQAJgIAACXAAAHSvgAAJUAAAeWCAAAGuxQAJEAABAaQ6AAGkfgAHJIABAo7QSAGkOwAF1BAAEa9QAAkgAAEBr5EACYCAAAlwAAB0r4AACVAAAHlggAABrsUACRAAAQGkOgABpH4ABySAAQKO0EgBpDsABdQQAAGvUAAJIAABAa+RAAmAgAAJcAAAdK+AAAlQAAAZYIAAAa7FAAGkPgABr0EAAa+QAAmAgAAJcAAAFK+AAAdGVzdF9mdW5jdGlvbgAAAAAAAAAAAARY';
const bytecodeBinary = Uint8Array.from(atob(bytecodeBase64), (c) => c.charCodeAt(0));

/**
 * @group node
 * @group browser
 */
test('should compress bytecode', () => {
  const compressedBytecode = compressBytecode(bytecodeBinary);
  expect(compressedBytecode.length).toBeLessThan(bytecodeBinary.length);
});

test('should decompress bytecode', () => {
  const compressedBytecode = compressBytecode(bytecodeBinary);
  const decompressedBytecode = decompressBytecode(compressedBytecode);
  expect(decompressedBytecode).toEqual(arrayify(bytecodeBinary));
});
