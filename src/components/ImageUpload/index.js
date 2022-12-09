import axios from 'axios';
import { useEffect, useState } from 'react';
const ImageUpload = () => {
    const [itemFile, setItemFile] = useState();
    const [avatar, setAvatar] = useState();
    // useEffect(() => {
    //     avatar && URL.revokeObjectURL(avatar?.preview);
    // }, [avatar]);
    const handleChangeImage = (e) => {
        const file = e.target.files;
        // file.preview = URL.createObjectURL(file);
        setItemFile(file);
        // setAvatar(file);
    };
    console.log('itemFile', itemFile);
    const submitForm = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        let fileImages = [];
        for (let i = 0; i < itemFile.length; i++) {
            console.log('itemFile[i]', itemFile[i]);
            fileImages.push(itemFile[i]);
        }
        const form_data = new FormData();
        for (let y = 0; y < fileImages.length; y++) {
            console.log('fileImages', fileImages[y]);
            form_data.append('files[]', fileImages[y]);
        }

        axios
            .post('https://duynh404.cf/api/files', form_data, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
        <div>
            <form onSubmit={submitForm} method="POST" enctype="multipart/form-data">
                <input type="file" name="files" onChange={handleChangeImage} multiple />
                {/* {avatar && <img style={{ width: '80px' }} src={avatar.preview} />} */}
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default ImageUpload;
