import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd';
import Pics from '../Pic/Pics'
import NewsHomeLayout from '../News/NewsHomeLayout'
import MineClearance from '../Game/MineClearance'

import './index.css'

const {
    Header, Content, Sider,
} = Layout;

class HomeLayout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            main: 'I name is WenJun Ye'
        }
    }

    selected = (event) => {
        switch(event.key) {
            case '1': this.setState({
                main: 'My name is WenJun Ye',
            }) ; break;
            case '2': this.setState({
                main: <NewsHomeLayout />,
            }); break;
            case '3': this.setState({
                main: <MineClearance />,
            }); break;
            case '4': this.setState({
                main: (<Pics />)
            }); break;
        }
    }

    toggle = ()=>{
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        const main = this.state.main
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onSelect={this.selected}>
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span>作者</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="read" />
                            <span>新闻</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="fire" theme="filled"/>
                            <span>游戏</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="picture" />
                            <span>美图</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content style={{
                        width: '100%',
                        height: '1000px',
                        margin: '24px 16px',
                        padding: 24,
                        background: '#fff',
                        minHeight: 280,
                    }}
                    >
                        { main }
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default HomeLayout
