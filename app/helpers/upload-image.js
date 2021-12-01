'use strict';

const randomstring = require('randomstring');
const path = require('path');
const sharp = require('sharp');
const { ensureDir } = require('fs-extra');

async function uploadImage(imageCar) {
  const { imageData, destination, width, height, codImage } = imageCar;
  await ensureDir();
}

module.exports = uploadImage;
