const {Router} = require('express')
let formidable = require('formidable');
let path = require('path');
let fs = require('fs');


const router = Router()


/* GET users listing. */
router.post('/upload', function (req, res, next) {
    let url = null;
    let form = new formidable.IncomingForm();
    let static_path = 'uploads/admin/';
    form.maxFileSize = 5 * 1024 * 1024; // b -> kb -> mb
    form.uploadDir = path.join(__dirname, '/../../static/', static_path);

    form.on('file', function (field, file) {
        url = static_path + file.name;
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    form.on('error', function (err) {
        res.send({error: err});
    });

    form.on('end', function () {
        res.status(200).send({url: url});
    });

    form.parse(req);

})


module.exports = router