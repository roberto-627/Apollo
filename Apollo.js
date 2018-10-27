const chokidar = require('chokidar');
var nodemailer = require('nodemailer');

var Specifications = require('./Specs.json');

function Apollo (){
    var Transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: Specifications.Email,
            pass: Specifications.Password
        }
    });

    var watcher = chokidar.watch(Specifications.Path, {
        ignored: /(^|[\/\\])\../,
        persistent: true
    });

    watcher
        .on('add', path => { 
                                console.log(`File ${path} has been added`);
                                if(path.includes("Test")){
                                    console.log(path);
                                    const mailOptions = {
                                        from: Specifications.Sender,
                                        to: Specifications.Recipients,
                                        subject: Specifications.Subject,
                                        html: Specifications.Body,
                                        attachments: [
                                            {
                                                filename: 'Test.txt',
                                                path: path
                                            }
                                        ]
                                    };

                                    Transporter.sendMail(mailOptions, function (err, info) {
                                        if(err)
                                            console.log(err);
                                        else
                                            console.log(info);
                                    });
                                }

                            })
        .on('change', path => console.log(`File ${path} has been changed`))
        .on('unlink', path => console.log(`File ${path} has been removed`));
}

module.exports = { Apollo };