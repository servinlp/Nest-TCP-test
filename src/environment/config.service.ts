import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as Joi from '@hapi/joi'

export type EnvConfig = Record<string, string>

export class ConfigService {
  private readonly envConfig: EnvConfig

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath))
    this.envConfig = this.validateInput(config)
  }

  get(key: string): string {
    return this.envConfig[key]
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(
          'development',
          'development-docker',
          'production',
          'staging',
          'acceptation',
        )
        .default('development'),
      PORT: Joi.number(),
    })

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    )
    if (error) {
      throw new Error(`Config validation error: ${error.message}`)
    }
    return validatedEnvConfig
  }
}

export const configService = new ConfigService(
  `src/environment/${process.env.NODE_ENV || 'development'}.env`,
)
