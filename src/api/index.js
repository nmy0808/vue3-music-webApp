import netWork from '@/api/netWork'

export const getBanner = () => netWork.get('/banner', { type: 2 })
