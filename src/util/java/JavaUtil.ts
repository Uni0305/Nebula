export class JavaUtil {

    public static getJavaExecutable(): string {
        const javaExecutable = process.env.JAVA_EXECUTABLE
        if (!javaExecutable) {
            throw new Error('JAVA_EXECUTABLE environment variable is not set')
        }
        return javaExecutable
    }

}
