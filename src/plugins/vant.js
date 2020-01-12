import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';

//按钮
import { Button } from 'vant';
Vue.use(Button);

//Tabbar
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar).use(TabbarItem);

//Skeleton 骨架屏
import { Skeleton } from 'vant';
Vue.use(Skeleton);

//icon图标
import { Icon } from 'vant';
Vue.use(Icon);

//遮罩层
import { Overlay } from 'vant';
Vue.use(Overlay);

//弹出层
import { Popup } from 'vant';
Vue.use(Popup);

//Picker 选择器
import { Picker } from 'vant';
Vue.use(Picker);

//输入框
import { Field } from 'vant';
Vue.use(Field);

//日期选择器
import { DatetimePicker } from 'vant';
Vue.use(DatetimePicker);

//SwitchCell 开关单元格
import { SwitchCell } from 'vant';
Vue.use(SwitchCell);

//单元格
import { Cell, CellGroup } from 'vant';
Vue.use(Cell).use(CellGroup);
 
//轮播
import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe).use(SwipeItem);
//下拉菜单
import { DropdownMenu, DropdownItem } from 'vant';
Vue.use(DropdownMenu).use(DropdownItem);
//上传
import { Uploader } from 'vant';
Vue.use(Uploader);
//搜索框
import { Search } from 'vant';
Vue.use(Search);
//加载控件
import { Loading } from 'vant';
Vue.use(Loading);
//标签
import { Tab, Tabs } from 'vant';
Vue.use(Tab).use(Tabs);
//侧边导航
import { Sidebar, SidebarItem } from 'vant';
Vue.use(Sidebar);
Vue.use(SidebarItem);
//卡片
import { Card } from 'vant';
Vue.use(Card);
//商品规格
import { Stepper } from 'vant';
Vue.use(Stepper);
//分割线
import { Divider } from 'vant';
Vue.use(Divider);
 
//提交订单栏
import { SubmitBar } from 'vant';
Vue.use(SubmitBar);
//复选框
import { Checkbox, CheckboxGroup } from 'vant';
Vue.use(Checkbox).use(CheckboxGroup);

//单选框
import { RadioGroup, Radio } from 'vant';
Vue.use(RadioGroup);
Vue.use(Radio);
//开关单元格
import { Switch } from 'vant';
Vue.use(Switch);
//Layout布局
import { Row, Col } from 'vant';
Vue.use(Row).use(Col);
//进度条
import { Progress } from 'vant';
Vue.use(Progress);

// 日期
import { Calendar } from 'vant';
Vue.use(Calendar);

//购物车
import {
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton
  } from 'vant';
  
  Vue
    .use(GoodsAction)
    .use(GoodsActionIcon)
    .use(GoodsActionButton);


import { PasswordInput, NumberKeyboard } from 'vant';

Vue.use(PasswordInput).use(NumberKeyboard);