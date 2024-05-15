const { errorServer, handleSaveFile, sendResult } = require("./Common.Service");
const { exec } = require('child_process');

exports.executeCode = async (data) => {
    try {
        data.code = data.code.replace(5, 'process.argv[2]');
        const file = await handleSaveFile(data.language, data.work, data.id, data.code, new Date().getTime());

        const work = {
            test: [
                { input: 4, output: 16 },
                { input: 5, output: 25 },
                { input: 6, output: 36 },
                { input: 7, output: 49 },
            ]
        };

        const result = [];
        for (let i = 0; i < work.test.length; i++) {
            const element = work.test[i];
            const command = handleCommand(data.language, file.fileCode, element.input);
            exec(`cd ${file.path} && ${command}`, (error, stdout, stderr) => {
                if (error) {
                    result.push(error);
                }
                if (stderr) {
                    result.push(stderr);
                }
                result.push(`test ${i + 1}${stdout == element.output ? ' success' : ' fail'}`);
            });
        }
        sendResult(result)
        return {
            status: 200,
            message: 'success'
        }
    } catch (error) {
        return errorServer(error);
    }
}
const handleCommand = (language, fileCode, test) => {
    switch (language) {
        case 'js':
            return `node ${fileCode} ${test}`;
        case 'c++':
            return `g++ ${fileCode} -o main.exe && main.exe`;
        case 'python':
            return `python ${fileCode} `;
        case 'java':
            return `javac ${fileCode} && java ${fileCode.replace('.java', '')} `;
    }
}