import { nip19 } from 'nostr-tools';

const HEX_KEY_REGEX = /^[0-9a-f]{64}$/;
export const BECH32_REGEX =
  /[\x21-\x7E]{1,83}1[023456789acdefghjklmnpqrstuvwxyz]{6,}/

const isHexKey = (key: string) => HEX_KEY_REGEX.test(key);

export type HexKey = string;

const toHexKey = (key: string): HexKey => {
  if (isHexKey(key)) return key;
  if (BECH32_REGEX.test(key)) {
    const { data } = nip19.decode(key);
    if (typeof data === 'string') return data;
    // TODO: nevent & nprofile
  }
  throw new Error('invalid hex key: ' + key);
}


export { isHexKey, toHexKey };
