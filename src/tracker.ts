import { parse } from "path";
import { createSocket } from "dgram";

export const getPeers = (torrent: any, callback: Function) => {
    const url = torrent.announce.toString("utf-8");

    // 3. create udp socket
    const socket = createSocket("udp4");

    const udpSend = (
        socket: any,
        message: any,
        rawUrl: any,
        callback = () => {}
    ) => {
        const url: any = parse(rawUrl);

        socket.send(message, 0, message.length, url.port, url.host, callback);
    };

    const responseType = (response: any) => {
        // pass
        return "";
    };

    const parseConnectResponse = (response: any): any => {
        // pass
    };

    const parseAnnounceRespnse = (response: any): any => {
        // pass
    };

    const buildAnnounceRequest = (connectionId: any) => {
        // pass
    };

    const buildConnectionRequest = (connectionId: any): any => {
        // pass
    };

    // 1. send connect request
    udpSend(socket, buildConnectionRequest(""), url);

    socket.on("message", (response: any) => {
        if (responseType(response) === "connect") {
            //2. Receive and parse connection request
            const parsedResponse = parseConnectResponse(response);

            //3. Send announce request
            const announceRequest = buildAnnounceRequest(
                parsedResponse.connectId
            );
        } else if (responseType(response) === "annouce") {
            //4. parse announce request
            const announceResponse = parseAnnounceRespnse(response);

            //5. pass annouce response to callback
            callback(announceResponse.peers);
        }
    });
};
