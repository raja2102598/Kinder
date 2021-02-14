import React, { useState } from "react"

//Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css"

//Adding antd modules and style
import { Modal, Form, Input } from "antd"
import { Button } from "react-bootstrap"
import "antd/dist/antd.css"

class Signup extends React.Component {
  render() {
    //popup and form code
    const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
      const [form] = Form.useForm()
      return (
        <Modal
          visible={visible}
          title="Signup"
          okText="Signup"
          cancelText="Cancel"
          onCancel={onCancel}
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields()
                onCreate(values)
              })
              .catch((info) => {
                console.log("Validate Failed:", info)
              })
          }}
        >
          <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            initialValues={{
              modifier: "public",
            }}
          >
            <Form.Item
              name="userfname"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: "Please enter First name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="userlname"
              label="Last Name"
              rules={[
                {
                  required: true,
                  message: "Please enter Last name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter Email!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Create Password"
              rules={[
                {
                  required: true,
                  message: "Please enter password!",
                },
              ]}
            >
              <Input type="password" />
            </Form.Item>
            <Form.Item
              name="password1"
              label="Confirm Password"
              rules={[
                {
                  required: true,
                  message: "Please enter password!",
                },
              ]}
            >
              <Input type="password" />
            </Form.Item>
          </Form>
        </Modal>
      )
    }

    const CollectionsPage = () => {
      const [visible, setVisible] = useState(false)

      const onCreate = (values) => {
        console.log("Received values of form: ", values)
        setVisible(false)
      }

      return (
        <div>
          <Button
            onClick={() => {
              setVisible(true)
            }}
            variant="outline-light"
          >
            Create Account
          </Button>
          <CollectionCreateForm
            visible={visible}
            onCreate={onCreate}
            onCancel={() => {
              setVisible(false)
            }}
          />
        </div>
      )
    }
    return (
      <div className="MainDiv">
        <div className="container">
          <CollectionsPage />
        </div>
      </div>
    )
  }
}
export default Signup
