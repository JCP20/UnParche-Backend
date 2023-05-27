import { Server, Socket } from "socket.io";

interface User {
  userId: string;
  socketId: string;
}

interface Message {
  senderId: string;
  receiverId: string;
  text: string;
}

export class SocketServer {
  private readonly server: Server;
  private users: User[] = [];

  constructor(io: Server) {
    this.server = io;
  }

  public listen(): void {
    console.log("ws listening on ws://localhost:4000");

    this.server.on("connection", (socket: Socket) => {
      console.log("User connected:", socket.id);

      // disconnect
      socket.on("disconnect", () => {
        console.log("A user disconnected!");
        this.removeUser(socket.id);
        this.server.emit("getUsers", this.users);
      });

      // add user
      socket.on("addUser", (userId: string) => {
        this.addUser(userId, socket.id);
        this.server.emit("getUsers", this.users);
      });

      // send and get message
      socket.on("sendMessage", ({ senderId, receiverId, text }: Message) => {
        const user = this.getUser(receiverId);
        this.server.to(user?.socketId).emit("getMessage", {
          senderId,
          text,
        });
      });
    });
  }

  private addUser(userId: string, socketId: string): void {
    !this.users.some((user) => user.userId === userId) &&
      this.users.push({ userId, socketId }); // add user to users array
  }

  private removeUser(socketId: string): void {
    this.users = this.users.filter((user) => user.socketId !== socketId);
  }

  private getUser(userId: string): User | undefined | any {
    return this.users.find((user) => user.userId === userId);
  }
}
