/******************************************************************
 * 04/06/2022 - Jose Durán Pareja
 * 
 * Basic config data
 * V1.0.0 - First version
 */
import { apiData } from "../common/apiData"
import { config } from "./interfaces/config";
export class ConfigService {
    static configuration: config = {
        user: apiData.user,
          password: apiData.password,
          server: apiData.sqlServer,
          database: apiData.sqlDatabase,
          pool: {
              max: 10,
              min: 0,
              idleTimeoutMillis: 30000
          },
          options: {
              encrypt: true, // for azure
              trustServerCertificate: true // change to true for local dev / self-signed certs
          }
    };
    public static Get() : Promise<config> {
        return new Promise<config>(resolve => {
            resolve(ConfigService.configuration);
        }) 
    }
    public static Refresh() {
        ConfigService.configuration.user = apiData.user;
        ConfigService.configuration.password = apiData.password;
        ConfigService.configuration.server = apiData.sqlServer;
        ConfigService.configuration.database = apiData.sqlDatabase;
    }
}