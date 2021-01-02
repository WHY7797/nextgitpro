import App, { Container } from "next/app";
import "antd/dist/antd.css";
import Layout from '../components/layout'
import MyContext from '../lib/my-context'
import {Provider} from 'react-redux'
import withRedux from "../lib/with-redux"
class MyApp extends App {
  state={
    context:1
  }
  static async getInitialProps(ctx) {
      const {Component}=ctx
      console.log('getInitialProps每次页面切换都会调用')
      let pageProps
      if(Component.getInitialProps){
        pageProps =await Component.getInitialProps(ctx)
      }
      return{
        pageProps
      }
  }
  render() {
    const { Component ,pageProps,reduxStore} = this.props;
    console.log(Component);
    return (
      <Container>
        <Layout>
          <Provider store={reduxStore}>
            <MyContext.Provider value={this.state.context}>
              <Component {...pageProps}/>
              <button onClick={()=>this.setState({context:`${this.state.context}😺`})}>测试改变Context</button>
            </MyContext.Provider>
          </Provider>
        </Layout>
      </Container>
    );
  }
}
export default withRedux(MyApp)
