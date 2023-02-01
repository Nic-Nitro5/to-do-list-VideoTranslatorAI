import { environment } from '../../environments/environment';

export const urls = {
    baseUrl: "https://localhost:7037/",
    translateApi: "https://translation.googleapis.com/language/translate/v2?key=" + environment.translateKey,
}