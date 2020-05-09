import { readFileSync } from "fs";
import { join } from "path";
import { parse } from "url";
import { decode } from "bencode";
import { createSocket } from "dgram";
import { Buffer } from "buffer";

const file = join(process.cwd(), "/src/all-bright-places.torrent");

// 1.
const torrent = decode(readFileSync(file));

// 2. parse the tracker url
const tracker = parse(torrent.announce.toString("utf-8"));

// 3. create udp socket
const socket = createSocket("udp4");

// 4. create message as a buffer to send on network
const message = Buffer.from("Hello", "utf-8");

// 5. send message on the network
socket.send(message, 0, message.length, +tracker.port, tracker.host, () => {});

// 6
socket.on("message", (msg) => {
    console.log(msg);
});
