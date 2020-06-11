import React, { useState, useEffect, useMemo } from 'react';
import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';
import {
  Container,
  Badge,
  NotificationList,
  Notification,
  Scroll,
} from './styles';

function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function loadNotifications() {
      const response = await api.get('notifications');
      const data = response.data.map((notification) => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.createdAt),
          new Date(),
          { addSuffix: true, locale: pt }
        ),
      }));
      setNotifications(data);
    }
    loadNotifications();
  }, []);

  const hasUnread = useMemo(
    () => !!notifications.find((n) => n.read === false),
    [notifications]
  );
  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleMarkAsRead(id) {
    await api.put(`notifications/${id}`);

    setNotifications(
      notifications.map((n) => (n._id === id ? { ...n, read: true } : n))
    );
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
        <MdNotifications color="#7159c1" size={20} />
      </Badge>

      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map((n) => (
            <Notification key={n._id} unread={!n.read}>
              <p>{n.content}</p>
              <time>{n.timeDistance}</time>
              {!n.read && (
                <button type="button" onClick={() => handleMarkAsRead(n._id)}>
                  Marcar como lida
                </button>
              )}
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}

export default Notifications;
