/** picsum.photos adreslerini istenen boyuta çevirir; diğer URL'lere dokunmaz. */
export function sized(url: string, w: number, h: number) {
  return url.replace(/^(https:\/\/picsum\.photos\/id\/\d+)\/\d+\/\d+/, `$1/${w}/${h}`);
}
