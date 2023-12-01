import {Module} from "@nestjs/common";
import {SocketClient} from 'src/models/socket.client'

@Module({
    providers: [SocketClient]
})
export class SocketModule2 {

}