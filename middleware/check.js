export default function ({ store, redirect }) {
  if (!store.getters.hasToken) {
    redirect('/login')
  } else { redirect('/admin') }
}
