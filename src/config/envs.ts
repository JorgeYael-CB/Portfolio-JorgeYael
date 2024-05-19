import 'dotenv/config';
import { get } from 'env-var';


export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    MAILER_PASS: get('MAILER_PASS').required().asString(),
    MAILER_USER: get('MAILER_USER').required().asString(),
}