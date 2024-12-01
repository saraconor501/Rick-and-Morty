
const Loading = () => {
    
  return (
    
    <>
    <img className={styles.overlay} src="https://raw.githubusercontent.com/Anixii/Rick-Morty/0280b2bdadb018eeb04bf110c975c2f0238073f5/app/assets/img/91%20(1).svg" alt="" />
    </>
  )
}
const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
    },
    spinner: {
      width: '100px',
      height: '100px',
    },
  };
export default Loading