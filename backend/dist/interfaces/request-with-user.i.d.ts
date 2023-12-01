import { Request } from 'express';
import User from 'src/entitys/user.entity';
interface RequestWithUser extends Request {
    user: User;
}
export default RequestWithUser;
