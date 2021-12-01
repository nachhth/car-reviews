'use strict';

const fs = require('fs');
const randomstring = require('randomstring');
const path = require('path');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-jason-error');
const { findUserById, uploadUserImage } = require('../../repositories/user-repository');
const { HTTP_SERVER, PATH_USER_IMAGE } = process.env;

const validExtension = ['.jpeg', '.jpg', '.png'];

async function uploadImageProfle(req, res) {
  try {
    const { id } = req.auth;
    const { files } = req;
    if (!files || Object.keys(files).length === 0) {
      throwJsonError(400, 'No file detected or empty');
    }
    // profileImage es el nombre de la variable que usamos en el postman
    const { profileImage } = files;
    // console.log('profileImage', profileImage);
    const { name } = profileImage;
    const extension = path.extname(name);

    if (!validExtension.includes(extension)) {
      throwJsonError(400, 'File not valid');
    }

    const pathProfileImage = `${__dirname}/../../../public/${PATH_USER_IMAGE}`;

    const user = await findUserById(id);
    const { image } = user;

    if (image) {
      fs.unlink(`${pathProfileImage}/${image}`, () => {
        console.log('Image deleted succesfully');
      });
    }

    const randomName = randomstring.generate(10);
    const imageName = `${id}-${randomName}${extension}`;
    const pathImage = `${pathProfileImage}/${imageName}`;

    profileImage.mv(pathImage, async function (err) {
      if (err) throwJsonError(500, err.message);
      await uploadUserImage(id, imageName);

      res.status(201);
      res.send({ url: `${HTTP_SERVER}/${PATH_USER_IMAGE}/${imageName}` });
    });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = uploadImageProfle;
