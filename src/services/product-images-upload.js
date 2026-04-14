const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3Cliente } = require("../config/aws-s3");
const { ProductImages, ProductsImages } = require("../models");

async function uploadFileToS3(file) {
  try {
    const fileName = `products/${Date.now()}-${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    });

    await s3Cliente.send(command);

    const url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    return url;
  } catch (error) {
    throw new Error(error);
  }
}

async function uploadProductsImages(files) {
  if (!files || files.lengh === 0) {
    return [];
  }

  try {
    const uploadPromises = files.map((file) => uploadFileToS3(file));

    const urls = await Promise.all(uploadPromises);
    console.log(urls);
    return urls;
  } catch (error) {
    throw new Error(error);
  }
}

async function saveProductsImages(productId, urls) {
  if (!urls || urls.lengh === 0) {
    return [];
  }

  try {
    const imagesData = urls.map((image) => ({
      product_id: productId,
      url: image,
    }));

    const SavedImages = await ProductsImages.bulkCreate(imagesData);
    return SavedImages;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Função que processa e realiza o upload das imagens no S3 e salva no banco de dados.
 * @param {string} productId - ID do Produto
 * @param {Array} files - Array de arquivos
 * @returns {Promise<Array>} - Array de Urls das imagens salvas
 */
async function uploadAndSaveProductsImages(product_id, files) {
  try {
    const urls = await uploadProductsImages(files);
    const images = await saveProductsImages(product_id, urls);

    return images;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  uploadFileToS3,
  uploadProductsImages,
  saveProductsImages,
  uploadAndSaveProductsImages,
};
