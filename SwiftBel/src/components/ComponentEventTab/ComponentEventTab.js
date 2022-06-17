import React, { useContext, useRef } from 'react';
import {
  TouchableOpacity, View, Text, ScrollView,
} from 'react-native';
import propTypes from 'prop-types';
import PagerView from 'react-native-pager-view';
import Styles from './EventTabStyle';
const TAG = 'ComponentEventsTab: ';

const ComponentEventsTab = ({ navigation }) => {
  const contextTab = useContext(ContextTab);
  const { selectedTabId, toggleTabId } = contextTab;
  const pageRef = useRef(null);
  debugLog(TAG, selectedTabId);
  const scrollRef = useRef();
  if (selectedTabId === 0) {
    scrollRef.current?.scrollTo({
      scrollY: 100 * selectedTabId,
      animated: true,
    });
  }
  else if (selectedTabId) {
    scrollRef.current?.scrollTo({
      x: 90 * selectedTabId,
      animated: true,
    });
  }
  return (
      <View style={Styles.flexContainer}>
        <View>
          <ScrollView
            horizontal
            ref={scrollRef}
            contentContainerStyle={Styles.tabScrollView}
            showsHorizontalScrollIndicator={false}
            style={Styles.containerStyle}
          >
            {TabConstants.map((item) => (
              <MTab data={item} key={`tab_${item.id}`} pageRef={pageRef} />
            ))}
          </ScrollView>
        </View>
        <PagerView
          style={Styles.flexContainer}
          ref={pageRef}
          onPageSelected={(e) => {
            toggleTabId(e.nativeEvent.position);
          }}
        >
          <View key={"TAB_ID_TODAY_KEY"}>
            <ComponentTabToday navigation={navigation} />
          </View>
          <View key={"TAB_ID_DIVIDEND_KEY"}>
            <ComponentTabDividend navigation={navigation} />
          </View>
          <View key={"TAB_ID_STOCK_SPLIT_KEY"}>
            <ComponentTabStockSplit navigation={navigation} />
          </View>
          <View key={"TAB_ID_REVERSE_SPLIT_KEY"}>
            <ComponentTabReverseSplit navigation={navigation} />
          </View>
          <View key={"TAB_ID_RIGHT_ISSUE_KEY"}>
            <ComponentTabRightIssue navigation={navigation} />
          </View>
          <View key={"TAB_ID_WARRANT_KEY"}>
            <ComponentTabWarrant navigation={navigation} />
          </View>
          <View key={"TAB_ID_BONUS_KEY"}>
            <ComponentTabBonus navigation={navigation} />
          </View>
          <View key={"TAB_ID_RUPS_KEY"}>
            <ComponentTabRUPS navigation={navigation} />
          </View>
          <View key={"TAB_ID_PUBLIC_EXPOSE_KEY"}>
            <ComponentTabPublicExpose navigation={navigation} />
          </View>
          <View key={"TAB_ID_IPO_KEY"}>
            <ComponentTabIPO navigation={navigation} />
          </View>
          {/* <View key={TAB_ID_TENDER_OFFER_KEY}>
            <ComponentTabTenderOffer navigation={navigation} />
          </View>
          <View key={TAB_ID_TRADE_OFFER_KEY}>
            <ComponentTabTradeOffer navigation={navigation} />
          </View> */}
        </PagerView>
      </View>
  );
};

const MTab = ({ data, pageRef }) => {
  const contextTab = useContext(ContextTab);
  const { toggleTabId, selectedTabId } = contextTab;
  const { id, title } = data;
  const onPressTab = () => {
    toggleTabId(id);
    pageRef.current?.setPage(id);
  };
  const isSelected = id === selectedTabId;

  const tabViewStyle = isSelected
    ? [Styles.activeTabView, Styles.tabView]
    : [Styles.inActiveTabView, Styles.tabView];
  const tabTextStyle = isSelected
    ? Styles.activeTabName
    : Styles.inActiveTabName;
  return (
    <ErrorHandler componentName="ComponentEventsTab:Mtab">
      <View>
        <TouchableOpacity style={tabViewStyle} onPress={() => onPressTab()}>
          <Text style={tabTextStyle}>{title}</Text>
        </TouchableOpacity>
      </View>
    </ErrorHandler>
  );
};

ComponentEventsTab.propTypes = {
  navigation: propTypes.object,
};
MTab.propTypes = {
  data: propTypes.object,
  pageRef: propTypes.any,
};
export default ComponentEventsTab;