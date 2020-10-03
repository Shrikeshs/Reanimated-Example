import React from 'react';
import { StyleSheet, View, Dimensions,Text,SafeAreaView } from 'react-native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
const { width } = Dimensions.get('window');

const { cond, eq, add, call, set, Value, event,or } = Animated;

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.dragX = new Value(0);
    this.dragY = new Value(0);
    this.offsetX = new Value(width / 2);
    this.offsetY = new Value(100);
    this.absoluteY= new Value(100);
    this.absoluteX=new Value(100);
    this.circleY = new Value(100);
    this.circleX= new Value(100);
    this.gestureState = new Value(-1);
    this.onGestureEvent = event([
    {
        nativeEvent: {
          translationX: this.dragX,
          translationY: this.dragY,
          absoluteY:this.absoluteY,
          absoluteX:this.absoluteX,
          state: this.gestureState,
        },
    },
    ]);

    // this.addY = add(this.offsetY, this.dragY);
     this.circleY = add(this.absoluteY, new Value(100));
     this.circleX=add(this.absoluteX,new Value(100));
     

 
    this.state ={
      dragging: false
    };
  }

  start = () => {
    // alert(`You dropped at x: ${x} and y: ${y}!`);
    this.setState({dragging:true});
  };
  stop =() => {
    this.setState({dragging:false})
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
         <Animated.Code>
          {() =>
            cond(eq(this.gestureState, State.BEGAN),call([], this.start))
          }
        </Animated.Code> 
        <Animated.Code>
          {() =>
            cond(eq(this.gestureState, State.END),call([], this.stop))
          }
        </Animated.Code> 
        {this.state.dragging&&<Animated.View style={[styles.box,{top:this.circleY,left:this.circleX}]}/>}
        
        <PanGestureHandler
          maxPointers={1}
          minDist={10}
          onGestureEvent={this.onGestureEvent}
          onHandlerStateChange={this.onGestureEvent}>
          <Animated.View
            style={[
             //styles.box,
              {
                  top:this.absoluteY,
                 left:this.absoluteX
              },
            ]}
          >
         <Text>Shrikesh</Text>
          </Animated.View>
        </PanGestureHandler>
      </SafeAreaView>
    );
  } 
}

const CIRCLE_SIZE = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: { 
    backgroundColor: 'tomato',
    position: 'absolute',
    marginLeft: -(CIRCLE_SIZE / 2),
    marginTop: -(CIRCLE_SIZE / 2),
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderColor: '#000',
  },
});