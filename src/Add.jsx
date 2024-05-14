import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, Input, message } from "antd";
import { PlusOutlined } from '@ant-design/icons'; // Ensure this import is included
import axios from "axios";

const Add = ({ onAdd }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    axios.post("https://starlit-crumble-346ef5.netlify.app/.netlify/functions/api/", values)
      .then((res) => {
        onAdd(res.data); // Removed the callback parameter
        message.success('Song added successfully');
        form.resetFields();
        setVisible(false);
      })
      .catch((error) => {
        console.error("Error adding song: ", error);
        message.error('Error adding song');
      });
  };

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>Add Song</Button>
      <Modal
        title="Add New Song"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item name="title" label="Song Title" rules={[{ required: true, message: 'Please enter the song title' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="song artist" label="song artist" rules={[{ required: true, message: 'Please enter the artist name' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Add</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

Add.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default Add;
