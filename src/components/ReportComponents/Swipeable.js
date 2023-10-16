import React,{ useState} from 'react';
import { View } from 'react-native';

const Swipeable =(props)=>{
  const {setSwipeDirection = null} = props;  
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.nativeEvent.touches[0].pageX);
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.nativeEvent.touches[0].pageX);
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    if (touchStart - touchEnd > minSwipeDistance) {
      setSwipeDirection('left')
    }
    if(touchStart - touchEnd < -minSwipeDistance){
      setSwipeDirection('right')
    }
  }
  return (
    <View onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} style={props.style} >
        {props.children}
    </View>
  );
}
export default Swipeable;