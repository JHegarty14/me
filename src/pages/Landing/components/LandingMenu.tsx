import styles from './LandingMenu.module.scss';
import { IconButton, IconButtonProps, TelescopeModal } from '../../../shared';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useEffect } from 'react';
import { useModalController } from '../../../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const LandingMenu = () => {
  const { openModal, setOpenModal } = useModalController();
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case 's':
          console.log('About');
          break;
        case 'p':
          setOpenModal('projects');
          break;
        case 'g':
          window.open('https://github.com/jhegarty14', '_blank');
          break;
        case 'l':
          window.open('https://www.linkedin.com/in/jack-m-hegarty', '_blank');
          break;
        case 'q':
          console.log('Quit');
          break;
        default:
          break;
      }
    });
  });
  const menuItems: IconButtonProps[] = [
    {
      icon: icon({ name: 'sitemap' }),
      text: 'About',
      keyMap: 's',
    },
    {
      icon: icon({ name: 'gear' }),
      text: 'Projects',
      keyMap: 'p',
      onClick: () => setOpenModal('projects')
    },
    {
      icon: icon({ name: 'github', style: 'brands' }),
      text: 'Github',
      keyMap: 'g',
    },
    {
      icon: icon({ name: 'linkedin', style: 'brands' }),
      text: 'LinkedIn',
      keyMap: 'l',
    },
    {
      icon: icon({ name: 'door-open' }),
      text: 'Quit',
      keyMap: 'q',
    },
  ];

  return (
    <>
      <div className={styles.landing_menu}>
        {menuItems.map((item) => (
          <IconButton {...item} />
        ))}
        <div className={styles.subtitle}>
          <FontAwesomeIcon icon={icon({ name: 'bolt-lightning' })} />
          &nbsp;
          Neovim loaded 65 plugins in 45.27ms
        </div>
      </div>
      {openModal === 'projects' && <TelescopeModal close={() => setOpenModal('')} />}
    </>
  );
}