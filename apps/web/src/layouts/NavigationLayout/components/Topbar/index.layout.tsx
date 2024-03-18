import { MenuOutlined } from '@ant-design/icons'
import { Flex, Layout, Menu } from 'antd'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { TabAdmin } from '../TabAdmin'
import { TabNotification } from '../TabNotifications'
import { TabProfile } from '../TabProfile'

const { Header } = Layout

interface Props {
  isMobile?: boolean
  logo?: ReactNode
  items: { key: string; label: string; onClick: () => void }[]
  itemsMobile: { key: string; label: string; onClick: () => void }[]
}

export const Topbar: React.FC<Props> = ({
  isMobile,
  logo,
  items,
  itemsMobile,
}) => {
  const pathname = usePathname()

  const style: any = {}

  const isThin = items.length === 0

  if (isThin) {
    style.height = '600px'
  }

  if (isMobile) {
    return (
      <>
        <Header>
          <Flex align="center" justify="space-between">
            {logo}

            <Menu
              mode="horizontal"
              items={itemsMobile}
              selectedKeys={[pathname]}
              style={{ width: 46 }}
              overflowedIndicator={<MenuOutlined />}
            />
          </Flex>
        </Header>
      </>
    )
  }

  return (
    <>
      <Header style={style}>
        <Flex align="center" style={style}>
          {logo}

          <Flex vertical flex={1}>
            <Menu
              mode="horizontal"
              items={items}
              selectedKeys={[pathname]}
              overflowedIndicator={<MenuOutlined />}
              style={{ flex: 1, paddingLeft: 48 }}
            />
          </Flex>

          <Flex align="center" gap="middle">
            <TabAdmin />
            <TabNotification />
            <TabProfile />
          </Flex>
        </Flex>
      </Header>
    </>
  )
}
