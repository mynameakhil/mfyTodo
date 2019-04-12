import React from "react";
import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";
import {
  Button,
  Input
  // Icon,
  // Menu,
  // Dropdown,
  // Pagination,
  // PageHeader
} from "antd";
import "antd/dist/antd.css";

const AddTodo = props => {
  const validationSchema = yup.object().shape({
    note: yup.string().required("note is required")
  });

  // const [noteText, setNoteText] = useState("");
  const addNotes = async val => {
    const url = `https://www.jsonstore.io/fa37af0fceeebbee4116592742e30b7d29917daa0005049565b3d6e1ff153037`;
    const { data } = await axios.get(url);
    // if (data.result === null) {
    //   await axios.post(url, {
    //     currentNotes: [noteText]
    //   });
    // }
    // else {
    await axios.post(url, {
      currentNotes: [...data.result.currentNotes, val]
    });
    // }

    props.history.push("/");
  };
  // const urlPass = () => {};
  // const IconFont = Icon.createFromIconfontCN({
  //   scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"
  // });
  const { TextArea } = Input;
  // const menu = (
  //   <Menu>
  //     <Menu.Item>
  //       <a
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         href="http://www.alipay.com/"
  //       >
  //         1st menu item
  //       </a>
  //     </Menu.Item>
  //     <Menu.Item>
  //       <a
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         href="http://www.taobao.com/"
  //       >
  //         2nd menu item
  //       </a>
  //     </Menu.Item>
  //     <Menu.Item>
  //       <a
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         href="http://www.tmall.com/"
  //       >
  //         3rd menu item
  //       </a>
  //     </Menu.Item>
  //   </Menu>
  // );
  // const routes = [
  //   {
  //     path: "index",
  //     breadcrumbName: "First-level Menu"
  //   },
  //   {
  //     path: "first",
  //     breadcrumbName: "Second-level Menu"
  //   },
  //   {
  //     path: "second",
  //     breadcrumbName: "Third-level Menu"
  //   }
  // ];

  return (
    <Formik
      initialValues={{ note: "" }}
      // validate={values => {
      //   const errors = {};
      //   if (!values.note) {
      //     errors.note = "Please Enter note";
      //     return errors;
      //   }
      // }}
      onSubmit={values => {
        setTimeout(() => {
          // alert(JSON.stringify(values, null, 2));
          console.log(values.note);
          addNotes(values.note);
        }, 400);
      }}
      render={({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit
      }) => (
        <form onSubmit={handleSubmit}>
          <TextArea
            name="note"
            type="text"
            placeholder="enter the note"
            autosize
            // value={noteText}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.note}
            // onChange={e => setNoteText(e.target.value)}
          />

          {errors.note && touched.note && errors.note}

          <div style={{ margin: "24px 0" }} />
          <Button type="primary" onClick={handleSubmit}>
            ADD
          </Button>
        </form>
      )}
      validationSchema={validationSchema}
    />

    // <TextArea
    //   placeholder="enter the note"
    //   autosize
    //   value={noteText}
    //   onChange={e => setNoteText(e.target.value)}
    // />
    // <div style={{ margin: "24px 0" }} />
    // <Button type="primary" onClick={addNotes}>
    //   Add
    // </Button>
    /* <div className="icons-list">
        <IconFont type="icon-tuichu" />
        <a href="https://www.w3schools.com">
          <IconFont type="icon-facebook" />
        </a>
        <IconFont type="icon-twitter" />
      </div>
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" href="#">
          Hover me <Icon type="down" />
        </a>
      </Dropdown>
      {/* <div className="icons-list">
        <Icon type="home" />
      </div> */
    /* <Pagination defaultCurrent={1} total={50} />
      <PageHeader title="Title" breadcrumb={{ routes }} />
    </div> */
  );
};
export default AddTodo;
