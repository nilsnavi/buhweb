import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const REQUESTS = [
  {
    id: 'REQ-1024',
    company: 'ООО "ТехСервис"',
    contact: 'Михаил Петров',
    service: 'Налоговый учет',
    status: 'В работе',
    amount: '12 200 ₽/мес',
    date: 'Сегодня, 11:40',
  },
  {
    id: 'REQ-1023',
    company: 'ИП Смирнова',
    contact: 'Анна Смирнова',
    service: 'Ведение бухучета',
    status: 'Новая заявка',
    amount: '7 600 ₽/мес',
    date: 'Сегодня, 09:18',
  },
  {
    id: 'REQ-1022',
    company: 'Интернет-магазин',
    contact: 'Елена Козлова',
    service: 'Кадровый учет',
    status: 'Ожидает договора',
    amount: '3 200 ₽/мес',
    date: 'Вчера, 17:55',
  },
  {
    id: 'REQ-1021',
    company: 'ООО "СтройФинанс"',
    contact: 'Максим Романов',
    service: 'Финансовый анализ',
    status: 'Завершена',
    amount: 'по запросу',
    date: '12 марта, 15:20',
  },
]

const TASKS = [
  {
    id: 1,
    title: 'Подготовить отчетность за февраль',
    owner: 'Екатерина Жукова',
    due: 'Сегодня',
    status: 'В работе',
  },
  {
    id: 2,
    title: 'Созвон с клиентом по переходу на УСН',
    owner: 'Илья Сорокин',
    due: 'Завтра',
    status: 'Запланировано',
  },
  {
    id: 3,
    title: 'Проверка документов по новому ИП',
    owner: 'Мария Кузнецова',
    due: 'Через 2 дня',
    status: 'Новая',
  },
]

const ACTIVITY = [
  {
    id: 1,
    title: 'Новая заявка от ИП Смирнова',
    time: '15 минут назад',
  },
  {
    id: 2,
    title: 'Отправлен КП для ООО "ТехСервис"',
    time: '1 час назад',
  },
  {
    id: 3,
    title: 'Добавлен новый тариф для ОСНО',
    time: 'Сегодня, 09:30',
  },
]

const STATUS_FILTERS = ['Все', 'Новая заявка', 'В работе', 'Ожидает договора', 'Завершена']

const AdminDashboard = () => {
  const [activeFilter, setActiveFilter] = useState('Все')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredRequests = useMemo(() => {
    return REQUESTS.filter((request) => {
      const matchesFilter =
        activeFilter === 'Все' || request.status === activeFilter
      const matchesSearch =
        request.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.service.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesFilter && matchesSearch
    })
  }, [activeFilter, searchTerm])

  return (
    <div className="admin">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand-icon">📊</span>
          <div>
            <p className="admin-brand-title">Бухучет Онлайн</p>
            <span className="admin-brand-subtitle">Админ-панель</span>
          </div>
        </div>
        <nav className="admin-nav">
          <button className="admin-nav-item active">Дашборд</button>
          <button className="admin-nav-item">Заявки</button>
          <button className="admin-nav-item">Клиенты</button>
          <button className="admin-nav-item">Отчеты</button>
          <button className="admin-nav-item">Настройки</button>
        </nav>
        <div className="admin-sidebar-footer">
          <Link to="/" className="admin-back-link">
            ← На сайт
          </Link>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-search">
            <span>🔍</span>
            <input
              type="search"
              placeholder="Поиск по заявкам и клиентам..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <div className="admin-topbar-actions">
            <button className="btn-secondary btn-medium">Создать отчет</button>
            <button className="btn-primary btn-medium">Новая заявка</button>
            <div className="admin-user">
              <div className="admin-user-avatar">АД</div>
              <div>
                <p className="admin-user-name">Анна Директор</p>
                <span className="admin-user-role">Руководитель</span>
              </div>
            </div>
          </div>
        </header>

        <section className="admin-section">
          <div className="admin-stats">
            <div className="admin-stat-card">
              <p className="admin-stat-title">Новые заявки</p>
              <h3 className="admin-stat-value">18</h3>
              <span className="admin-stat-note">+12% за неделю</span>
            </div>
            <div className="admin-stat-card">
              <p className="admin-stat-title">Конверсия</p>
              <h3 className="admin-stat-value">42%</h3>
              <span className="admin-stat-note">Воронка продаж</span>
            </div>
            <div className="admin-stat-card">
              <p className="admin-stat-title">Доход в месяц</p>
              <h3 className="admin-stat-value">1 240 000 ₽</h3>
              <span className="admin-stat-note">План 1.5 млн ₽</span>
            </div>
            <div className="admin-stat-card">
              <p className="admin-stat-title">Активные клиенты</p>
              <h3 className="admin-stat-value">64</h3>
              <span className="admin-stat-note">+4 за месяц</span>
            </div>
          </div>
        </section>

        <section className="admin-section">
          <div className="admin-section-header">
            <div>
              <h2 className="admin-section-title">Заявки</h2>
              <p className="admin-section-subtitle">
                Управляйте входящими заявками и контролируйте статус.
              </p>
            </div>
            <div className="admin-filters">
              {STATUS_FILTERS.map((filter) => (
                <button
                  key={filter}
                  className={`admin-filter ${
                    activeFilter === filter ? 'active' : ''
                  }`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="admin-table">
            <div className="admin-table-header">
              <span>Компания</span>
              <span>Услуга</span>
              <span>Статус</span>
              <span>Сумма</span>
              <span>Дата</span>
            </div>
            {filteredRequests.map((request) => (
              <div key={request.id} className="admin-table-row">
                <div>
                  <p className="admin-table-title">{request.company}</p>
                  <span className="admin-table-subtitle">{request.contact}</span>
                </div>
                <span>{request.service}</span>
                <span className={`admin-status ${request.status.replace(/\s/g, '')}`}>
                  {request.status}
                </span>
                <span>{request.amount}</span>
                <span>{request.date}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-section admin-grid">
          <div className="admin-panel">
            <div className="admin-panel-header">
              <h3>Задачи на сегодня</h3>
              <button className="admin-link">Все задачи →</button>
            </div>
            <ul className="admin-task-list">
              {TASKS.map((task) => (
                <li key={task.id} className="admin-task">
                  <div>
                    <p className="admin-task-title">{task.title}</p>
                    <span className="admin-task-meta">
                      {task.owner} · {task.due}
                    </span>
                  </div>
                  <span className="admin-task-status">{task.status}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="admin-panel">
            <div className="admin-panel-header">
              <h3>Активность</h3>
              <button className="admin-link">История →</button>
            </div>
            <ul className="admin-activity">
              {ACTIVITY.map((item) => (
                <li key={item.id} className="admin-activity-item">
                  <span className="admin-activity-dot"></span>
                  <div>
                    <p className="admin-activity-title">{item.title}</p>
                    <span className="admin-activity-time">{item.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="admin-panel admin-panel-highlight">
            <div>
              <h3>Показатели отдела</h3>
              <p>
                Обновлено 10 минут назад. Проверьте ключевые метрики за неделю.
              </p>
            </div>
            <div className="admin-metrics">
              <div>
                <span>Средняя маржа</span>
                <strong>31%</strong>
              </div>
              <div>
                <span>Скорость ответа</span>
                <strong>2 ч 14 мин</strong>
              </div>
              <div>
                <span>Оплаты в срок</span>
                <strong>96%</strong>
              </div>
            </div>
            <button className="btn-primary btn-medium">Открыть отчеты</button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AdminDashboard
