import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as echarts from 'echarts';
 
class MermaidComponent extends Component {
  constructor(props) {
    super(props);
    this.echartRef = React.createRef();
    this.state = { hasError: false };
  }
 
  componentDidMount() {
    if (this.echartRef.current) {
        const myChart = echarts.init(this.echartRef.current);
        myChart.setOption(this.props.option);
      } else {
        console.error('ECharts渲染异常: echartRef is null');
        return <div>ECharts渲染异常，请稍后重试。</div>;
      }
  }
 
  componentDidCatch(error, info) {
    // 处理错误，例如记录错误到服务器
    console.error('ECharts渲染异常:', error, info);
    this.setState({ hasError: true });
  }
 
  render() {
    if (this.state.hasError) {
      // 可以在这里渲染一个错误提示或者空白组件
      return <div>ECharts渲染异常，请稍后重试。</div>;
    }
 
    return <div ref={this.echartRef} style={{ width: '100%', height: '100%' }} />;
  }
}
 
EchartComponent.propTypes = {
  option: PropTypes.object.isRequired,
};
 
export default MermaidComponent;