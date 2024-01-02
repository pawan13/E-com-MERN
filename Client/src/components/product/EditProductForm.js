import React, { useEffect, useState } from "react";
import { Button, Form, ProgressBar } from "react-bootstrap";
import { CustomInput } from "../custom-input/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { addProductAction, deleteProduct, fetchSingleProductAction } from "../../pages/products/productAction";
import slugify from "slugify";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebase-config";
import { useNavigate, useParams } from "react-router";

export const EditProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();

  
  const [img, setImg] = useState();
  const [progress, setProgress] = useState(0);
  const [imgToRemove, setImgToRemove] = useState([]);

  const { catList } = useSelector((state) => state.categories);
  const { selectedProduct } = useSelector((state) => state.products);

  const [form, setForm] = useState({
    status: "inactive",
  });
 
  useEffect(() => {
    !form.slug && dispatch(fetchSingleProductAction(id));

    setForm(selectedProduct);
  }, [dispatch, form.slug, selectedProduct, selectedProduct.slug, id]);
 

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const slug = slugify(form.title, { lower: true, trim: true });

      // uploda the images receive the url
      let oldImgToKeep =[];
      let imageUrls = [];
      if (img.length) {
        //loop through images
        const imagesPending = img.map((img) => {
          return new Promise((resolve, reject) => {
            const storeRef = ref(
              storage,
              `/products/img/${Date.now()}-${img.name}`
            );

            const uploadImg = uploadBytesResumable(storeRef, img);

            uploadImg.on(
              //state change
              "state_changed",

              // progress while uploading
              (snapshot) => {
                console.log(snapshot);
                const per = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                setProgress(per);
              },

              // catch erro if any thrown
              (error) => {
                console.log(error);
                toast.error(error.message);
              },

              // once uploading process is completed, get the url of the upload image
              async () => {
                await getDownloadURL(uploadImg.snapshot.ref).then((url) => {
                  resolve(url);
                });
              }
            );
          });
        });

        imageUrls = await Promise.all(imagesPending);

         //remove images urls
          if(form.image)
         oldImgToKeep = form.images.filter((img) => !imgToRemove.includes(img));
        // add the url with from
        dispatch(
          addProductAction({
            ...form,
            slug,
            images: imageUrls,
            thumbnail: imageUrls[0],
          })
        );
        imgToRemove()
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;
    if (name === "thumbnail" && imgToRemove.includes(value)) {
      return alert("Thubnail can't be deleted, change the thumbnail first");
    }

    if (name === "status") {
      value = checked ? "active" : "inactive";
    }
    setForm({
      ...form,
      [name]: value,
    });
  };
  const inputs = [
    {
      label: "Product Name",
      name: "title",
      type: "text",
      placeholder: "mobile phone",
      required: true,
      value:form.title
    },
    {
      label: "Slug",
      name: "slug",
      type: "text",
      required: true,
      value: form.slug,
      disabled: true,
    },
    {
      label: "SKU",
      name: "sku",
      type: "text",
      placeholder: "MB_KD8",
      required: true,
      value:form.sku,
      disabled:true,
    },

    {
      label: "Price",
      name: "price",
      type: "number",
      placeholder: "34",
      required: true,
      value:form.price,
    },
    {
      label: "Qty",
      name: "qty",
      type: "number",
      placeholder: "33",
      required: true,
      value: form.qty,
    },
    {
      label: "Sales Price",
      name: "salesPrice",
      type: "number",
      placeholder: "22",
      value:form.salesPrice,
    },
    {
      label: "Sales Start From",
      name: "salesStartAt",
      type: "date",
      value: form.salesStartAt,
    },
    {
      label: "Sales End From",
      name: "salesEndAt",
      type: "date",
      value: form.salesEndAt,
    },
    {
      label: "Product Description",
      name: "description",
      type: "text",
      as: "textarea",
      placeholder: "Product details ....",
      required: true,
      rows: 10,
      value:form.description
    },
  ];

  const handleOnImageAttached = (e) => {
    const { files } = e.target;

    setImg([...files]);
  };

  const selectOnImageDelete = (e) => {
    const { checked, value } = e.target;
    console.log(checked, value);
    //

    if (checked) {
      if (form.thumbnail === value) {
        return alert("Thubnail can't be deleted, change the thumbnail first");
      }
      // insert img inthe array
      setImgToRemove([...imgToRemove, value]);
    } else {
      const filteredImg = imgToRemove.filter((img) => img !== value);
      setImgToRemove(filteredImg);
    }
  };

  const handleOnDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      //proceed to delete this product
      const result = await dispatch(deleteProduct(id));

      result && navigate("/products");
    }
  };

  return (
    <div>
      <Form
        className=" border p-5 shadow-lg rounded mt-3"
        onSubmit={handleOnSubmit}
      >
        <Form.Group className="mb-3">
          <Form.Check
            name="status"
            type="switch"
            label="Status"
            onChange={handleOnChange}
          />
        </Form.Group>

        {/* category dropdown */}
        <Form.Group className="mb-3">
          <Form.Label>Select Category</Form.Label>
          <Form.Select name="parentCat" onChange={handleOnChange}>
            <option value="">--select --</option>
            {catList.map(({ name, slug }, i) => (
              <option key={i} value={slug} selected={slug === form.parentCat}>
                {name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {inputs.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handleOnChange} />
        ))}

<div className="border rounded p-1 d-flex gap-2">
          {form.images?.length > 0 &&
            form.images?.map((img) => (
              <div key={img}>
                <div>
                  <input
                    type="radio"
                    name="thumbnail"
                    id="thumbnail"
                    value={img}
                    checked={img === form.thumbnail}
                    onChange={handleOnChange}
                  />

                  <label htmlFor="thumb">Thumbnail</label>
                </div>
                <img src={img} alt="" width="150px" />
                <div>
                  <Form.Check
                    label="Delete"
                    value={img}
                    onChange={selectOnImageDelete}
                    checked={imgToRemove.includes(img)}
                  />
                </div>
              </div>
            ))}
            </div>

        {/* image uploader */}

        <Form.Group className="mb-3">
          <Form.Control
            name="images"
            type="file"
            onChange={handleOnImageAttached}
            multiple
          />
          <ProgressBar animated now={progress} />
        </Form.Group>

        <div className="d-grid">
          <Button variant="outline-dark" type="submit">
            Update Product
          </Button>
        </div>
      </Form>
      <div className="d-grid">
        <Button variant="danger" onClick={handleOnDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};
