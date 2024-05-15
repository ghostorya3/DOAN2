const { errorServer, handleSaveFile, sendResult } = require("./Common.Service");
const { exec } = require('child_process');

exports.executeCode = async (data) => {
    try {
        const file = await handleSaveFile(data.language, data.work, data.id, data.code, new Date().getTime());

        const command = handleCommand(data.language, file.fileCode);

        exec(`cd ${file.path} && ${command}`, (error, stdout, stderr) => {
            if (error) {
                sendResult(error)
            }
            if (stderr) {
                sendResult(stderr)
            }
            sendResult(stdout)
        });
        return {
            status: 200,
            message: 'success'
        }
    } catch (error) {
        return errorServer(error);
    }
}
const handleCommand = (language, fileCode) => {
    switch (language) {
        case 'js':
            return `node ${fileCode}`;
        case 'c++':
            return `g++ ${fileCode} -o main.exe && main.exe`;
        case 'python':
            return `python ${fileCode}`;
        case 'java':
            return `javac ${fileCode} && java ${fileCode.replace('.java', '')}`;
    }
}