import { arrayify, BytesLike, concat, CryptoApi, hashMessage, hexlify, keccak256, Signer, toBytes, toUtf8Bytes } from "fuels";

const MESSAGE_PREFIX = '\x19Ethereum Signed Message:\n';

const PVT_KEY = "0x06ab50dc9fbe17665b0bc8a28eebe2ec274918d384d3a02b36973a07cbb7c784";
const TX_ID = "0x63653031303038656439323164313835306631376332323830643863363135326534396537343537643631643633383538306234313361326535396365376562";
const SIGNATURE_TRUST = "0xabb9fdf8d71e4f3cd09d6edb8c017540a1ee7946426017b083c039d3342c00763bbd12a991cea7862645c0b1c7400f25671cdc83c91769ca044169c3d4e89d531c";
const SIGNATURE_PHANTOM = "0x6bd389b9b2565652066d6c02670066eca00536b82cebe5e6647a58df34dff1f55b7376c4792177651a361735c14bd0e34d24fcc2cc1c817c3ac585e8f1581c591c";

const sign = (data: BytesLike) => {
  const signature = keccak256.sign(arrayify(data), arrayify(PVT_KEY));

  const r = toBytes(`0x${signature.r.toString(16)}`, 32);
  const s = toBytes(`0x${signature.s.toString(16)}`, 32);

  // add recoveryParam to first s byte
  s[0] |= (signature.recovery || 0) << 7;

  return hexlify(concat([r, s]));
}

test('test', async () => {
  const signer = new Signer(PVT_KEY);

  const message = TX_ID;
  const messageBytes = toUtf8Bytes(message);
  const payload = concat([
    toUtf8Bytes(MESSAGE_PREFIX),
    toUtf8Bytes(String(messageBytes.length)),
    messageBytes,
  ]);
  const hashedMessage = hexlify(keccak256(payload));

  console.log(signer.sign(hashedMessage));
});

