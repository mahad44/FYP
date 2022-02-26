import { useState } from "react";
import { Form,Button } from "react-bootstrap";
import Input from "./Input";

const GroupForm = () => {

    const[name,setName]=useState("");
    const [description,setDescription] = useState("");


    return ( 
        <>
        <Form onSubmit={submit}>
        <Input
          label="Product Name"
          type="Text"
          placeholder="Enter product name"
          val={productName}
          updateState={e => setProductName(e.target.value)}
        />
        <Input
          label="Price"
          type="number"
          val={price}
          placeholder="Enter price in PKR"
          updateState={e => setPrice(e.target.value)}
        />

        <Input
          label="Description"
          type="textarea"
          val={productDescription}
          placeholder="Add product description."
          updateState={e => setProductDescription(e.target.value)}
        />

        <div className="row mt-4 mb-3">
          <div className="col-md-3 offset-md-2">
            <Button
              variant={variant}
              type="submit"
              style={{ width: "100%" }}
              onClick={()=>{setVariant('success')}}
              disabled={
                productName === "" || price === "" || productDescription === ""
                  ? true
                  : false
              }
            >
              {props.action || "Create"}
            </Button>
          </div>
        </div>
      </Form>
        </>
     );
}
 
export default GroupForm;