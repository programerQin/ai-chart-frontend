import { analysisBySynchronizeUsingPost } from '@/services/aichart/chartController';
import { fileDownloadUsingGet } from '@/services/aichart/commonController';
import { getUserByIdUsingGet } from '@/services/aichart/scoreController';
import { UploadOutlined } from '@ant-design/icons';
import { DownloadOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Spin,
  Upload,
} from 'antd';
import ReactECharts from 'echarts-for-react';
import React, { useState } from 'react';

/**
 * 图表分析（同步）
 */
const addChart: React.FC = () => {
  //用于存放图表信息
  const [chart, setChart] = useState<API.BiResponse>();
  //提交中的状态，默认为未提交
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { TextArea } = Input;

  const onFinish = async (values: any) => {
    //避免重复提交
    if (submitting) {
      return;
    }
    setSubmitting(true);
    //再次提交后清空页面数据
    setChart(undefined);
    //此处先解构，拿到需要的参数
    const params = {
      type: 'static',
      ...values,
      file: undefined,
    };
    try {
      const scoreRes = await getUserByIdUsingGet();
      if (scoreRes.data < 5) {
        message.error('积分不足，请联系管理员！');
      } else {
        const res = await analysisBySynchronizeUsingPost(
          params,
          {},
          values.file.file.originFileObj,
        );
        if (!res?.data) {
          message.error('分析失败:' + res.message);
        } else {
          message.success('分析成功');
          setChart(res.data);
        }
      }
    } catch (e: any) {
      message.error('分析失败' + e.message);
    }
    //结束后设为false
    setSubmitting(false);
  };
  const formItemLayout = {
    labelAlign: 'left',
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const downloadTest = async () => {
    const fileName = "test.xlsx";
    await fileDownloadUsingGet({fileName});
  
  };

  return (
    <div className="add-chart">
      <Row gutter={24}>
        <Col span={12}>
          <Card title={'智能分析'}>
            <Form
              name="add-chart"
              {...formItemLayout}
              onFinish={onFinish}
              initialValues={{
                'input-number': 3,
                'checkbox-group': ['A', 'B'],
                rate: 3.5,
                'color-picker': null,
              }}
              style={{ maxWidth: 600 }}
            >
              <Form.Item label="分析目标" name={'goal'} rules={[{ required: true }]}>
                <TextArea placeholder={'请输入你的分析诉求,例如：分析商品的销售情况'} allowClear rows={4} />
              </Form.Item>

              <Form.Item label="图表名称" name="chartName" rules={[{ required: true }]}>
                <Input placeholder={'请输入你的图表名称'} />
              </Form.Item>

              <Form.Item name="chartType" label="图表类型">
                <Select
                  options={[
                    { value: '折线图', label: '折线图' },
                    { value: '柱状图', label: '柱状图' },
                    { value: '散点图', label: '散点图' },
                    { value: '饼图', label: '饼图' },
                    { value: '堆叠图', label: '堆叠图' },
                    { value: '雷达图', label: '雷达图' },
                  ]}
                ></Select>
              </Form.Item>
              <Form.Item name="mode" label="大模型">
                <Select
                  options={[
                    { value: 'GLM_3_5_TURBO', label: 'GLM_3_5_TURBO (推荐) 适用于复杂的对话交互和深度内容创作设计的场景' },
                    { value: 'CHATGLM_TURBO', label: 'CHATGLM_TURBO 适用于对知识量、推理能力、创造力要求较高的场景' },
                    { value: 'GLM_4', label: 'GLM_4 适用于复杂的对话交互和深度内容创作设计的场景' },
                    { value: 'GLM_4V', label: 'GLM_4V 根据输入的自然语言指令和图像信息完成任务' },
                    { value: 'COGVIEW_3', label: 'COGVIEW_3 根据文字生成图片' },
                
                  ]}
                ></Select>
              </Form.Item>

              <Form.Item
                name="file"
                label="原始数据"
                rules={[{ required: true, message: '请上传文件' }]}
              >
                <Upload name="file" maxCount={1} accept={'.xls,.xlsx'}>
                  <Button icon={<UploadOutlined />}>上传excel文件</Button>
                </Upload>
              </Form.Item>
              <Button
                type="default"
                size="small"
            
                style={{ fontSize: 9 }}
                icon={<DownloadOutlined />}
                onClick={downloadTest}
              >
                示例数据
              </Button>

              <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={submitting}
                    disabled={submitting}
                  >
                    提交
                  </Button>
                  <Button htmlType="reset">重置</Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card title={'分析结论'}>
            {chart?.genResult ?? <div>请在左侧提交表单</div>}
            <Spin spinning={submitting} />
          </Card>
          <Divider></Divider>
          <Card title={'生成图表'}>
            {chart?.genChart ? (
              <ReactECharts option={JSON.parse(chart.genChart)} />
            ) : (
              <div>请在左侧提交表单</div>
            )}
            <Spin spinning={submitting} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default addChart;
