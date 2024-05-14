import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Table, Button, Modal, Form, Input, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const App = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Song Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Song Artist',
      dataIndex: 'artist',
      key: 'artist',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <span>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure you want to delete this song?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" icon={<DeleteOutlined />}>Delete</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const handleAdd = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleEdit = (record) => {
    console.log('Edit:', record);
    form.setFieldsValue(record); // Set initial form values to the record being edited
    setIsModalVisible(true); // Open the modal for editing
  };

  const handleSave = () => {
    form.validateFields()
      .then(values => {
        const existingSongIndex = data.findIndex(item => item.title === values.title && item.artist === values.artist);
        if (existingSongIndex !== -1) {
          // Update existing song
          const newData = [...data];
          newData[existingSongIndex] = values;
          setData(newData);
          message.success('Song updated successfully');
        } else {
          // Add new song
          setData([...data, values]);
          message.success('Song added successfully');
        }
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch(error => {
        console.error('Validation failed:', error);
        message.error('Validation failed');
      });
  };
  
  const handleDelete = (record) => {
    console.log('Delete:', record);
    setData(data.filter(item => item.title !== record.title)); // Filter out the deleted song
    message.success('Song deleted');
  };

  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Music Library</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Music</Breadcrumb.Item>
          <Breadcrumb.Item>Library</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>Add Song</Button>
          <Table dataSource={data} columns={columns} />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Music Library ©2024 Created by Cindy Legaspino</Footer>
      <Modal title="Add New Song" visible={isModalVisible} onOk={handleSave} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Song Title" rules={[{ required: true, message: 'Please enter the song title' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="artist" label="Artist" rules={[{ required: true, message: 'Please enter the artist name' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}

export default App;
