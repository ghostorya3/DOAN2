const { errorServer, handleSaveFile } = require("./Common.Service");
const { exec } = require('child_process');

exports.executeCode = async (data) => {
    try {
        const file = await handleSaveFile(data.language, data.work, data.id, data.code, new Date().getTime());

        const command = handleCommand(data.language, file.fileCode);

        exec(`cd ${file.path} && ${command}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Lỗi: ${error.message}`);
                // Trả về lỗi cho client
                return;
            }
            if (stderr) {
                console.error(`Lỗi tiêu chuẩn: ${stderr}`);
                // Trả về lỗi cho client
                return;
            }
            console.log(`Kết quả: ${stdout}`);
            // Trả kết quả về cho client
        });

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