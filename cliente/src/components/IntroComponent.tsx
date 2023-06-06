import { useSpring, animated, config } from '@react-spring/web'
import pigmeo from '../assets/logo-dark.png';

export default function IntroComponent() {

  const props = useSpring({
    from: {
      opacity: 0,
      scale: 0.8,
      rotate: 0,
    },
    to: async (next) => {
      await next({ opacity: 1, scale: 1.1, rotate: 360 });
    },
    config: {
      tension: 200,
      friction: 10,
    },
  })

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-t from-primary-900 to-primary-600">
      <animated.div style={props}>
        <div className="w-screen flex justify-center pl-9">
          <img src={pigmeo} className="w-44 mb-7" alt="" />
        </div>
      </animated.div>
    </div>
  );
}
