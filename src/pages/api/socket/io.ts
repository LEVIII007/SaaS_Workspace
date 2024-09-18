import { NextApiResponseServerIo } from '@/lib/types';
import { Server as NetServer } from 'http';
import { Server as ServerIO } from 'socket.io';
import { NextApiRequest } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  console.log('ioHandler invoked');
  
  if (!res.socket.server.io) {
    console.log('Initializing new Socket.IO server');
    
    const path = '/api/socket/io';
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path,
      addTrailingSlash: false,
    });

    io.on('connection', (s) => {
      console.log('New client connected');

      s.on('create-room', (fileId) => {
        console.log(`Client creating/joining room: ${fileId}`);
        s.join(fileId);
        console.log(`Client joined room: ${fileId}`);
      });

      s.on('send-changes', (deltas, fileId) => {
        console.log(`Received changes for fileId ${fileId}:`, deltas);
        s.to(fileId).emit('receive-changes', deltas, fileId);
        console.log(`Emitted changes to room: ${fileId}`);
      });

      s.on('send-cursor-move', (range, fileId, cursorId) => {
        console.log(`Received cursor move for fileId ${fileId}, cursorId ${cursorId}:`, range);
        s.to(fileId).emit('receive-cursor-move', range, fileId, cursorId);
        console.log(`Emitted cursor move to room: ${fileId}`);
      });
    });

    res.socket.server.io = io;
  } else {
    console.log('Socket.IO server already initialized');
  }

  res.end();
};

export default ioHandler;