export function useSection<T = any>(name: string) {
  const { locale } = useI18n()
  const data = shallowRef<Record<string, T> | null>(null)

  async function load() {
    // динамический импорт JSON из папки content
    const mod = await import(`~/content/${name}.json`)
    data.value = mod.default
  }

  onMounted(load)
  watch(locale, () => {}, { flush: 'post' }) // роут сам перерендерит, обычно повторная загрузка не нужна

  const section = computed<T | null>(() => {
    if (!data.value) return null
    return (data.value[locale.value] ?? data.value['et']) as T
  })

  return { section, reload: load }
}