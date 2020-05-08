import { readFileSync } from "fs";
import { join } from "path";
import { parse } from "url";
import { createSocket } from "dgram";
import { decode } from "bencode";

const file = join(process.cwd(), "/src/all-bright-places.torrent");

// 1.
const server = createSocket("udp4");

const torrent = decode(readFileSync(file));
const url = parse(torrent.announce.toString("utf-8"));
// 2.
console.log(url);
