import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Form, Input, Button, message } from "antd";
import axios from "axios";

const Update = ({ record, onCancel, onUpdate }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    form.setFieldsValue(record);
  }, [record, form]);

  const handleCancel = () => {
    setVisible(false);
    onCancel();
  };

  const onFinish = async (values) => {
    try {
      await axios.put(
        `https://starlit-crumble-346ef5.netlify.app/.netlify/functions/api/${record._id}`,
        values
      );
      message.success("Song updated successfully");
      onUpdate(record._id, values);
      form.resetFields();
      setVisible(false);
    } catch (error) {
      console.error("Error updating song: ", error);
      message.error("Failed to update song");
    }
  };

  return (
    <div>
      <Modal
        title="Update Song"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          initialValues={{ title: record.title, artist: record.artist }}
        >
          <Form.Item
            name="title"
            label="Song Title"
            rules={[{ required: true, message: "Please enter the song title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="number"
            label="Number"
            rules={[{ required: true, message: "Please enter the song number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Update</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

Update.propTypes = {
  record: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Update;
