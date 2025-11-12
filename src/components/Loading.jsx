import { Mosaic } from 'react-loading-indicators';
const Loading = () => {
  return (
    <div className='flex flex-col justify-center items-center h-100'>
      <Mosaic
        color={['#32cd32', '#327fcd', '#cd32cd', '#cd8032']}
        text='Loading...'
        textColor='var(--p)'
        size='large'
      />
    </div>
  );
};

export default Loading;
