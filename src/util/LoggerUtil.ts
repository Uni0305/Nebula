import { createLogger, format, transports, Logger } from 'winston'
import { SPLAT } from 'triple-beam'
import { DateTime } from 'luxon'
import { inspect } from 'util'

export class LoggerUtil {
    public static getLogger(label: string): Logger {
        return createLogger({
            format: format.combine(
                format.label(),
                format.colorize(),
                format.label({ label }),
                format.printf((info) => {
                    const splat = info[SPLAT] as unknown[] | undefined
                    let message = info.message as string
                    if (splat) {
                        if (splat.length === 1 && splat[0] instanceof Error) {
                            const err: Error = splat[0]
                            if (
                                typeof message === 'string' &&
                message.length > err.message.length &&
                message.endsWith(err.message)
                            ) {
                                message = message.substring(
                                    0,
                                    message.length - err.message.length
                                )
                            }
                        } else if (splat.length > 0) {
                            message +=
                ' ' +
                splat
                    .map((it: unknown) => {
                        if (typeof it === 'object' && it != null) {
                            return inspect(it, false, 4, true)
                        }
                        return it
                    })
                    .join(' ')
                        }
                    }
                    if (typeof info.message === 'object') {
                        message = inspect(info.message, false, 4, true)
                    }
                    let stackStr = ''
                    if (info.stack) {
                        stackStr = `\n${
                            typeof info.stack === 'string'
                                ? info.stack
                                : inspect(info.stack, false, 4, true)
                        }`
                    }
                    return `[${DateTime.local().toFormat('yyyy-MM-dd TT').trim()}] [${
                        info.level
                    }] [${info.label}]: ${message}${stackStr}`
                })
            ),
            level: 'debug',
            transports: [new transports.Console()],
        })
    }
}
