import { Briefcase, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { showResumeAssistant } from './ResumeAssistant'

export default function ResumeAssistantButton() {
  const { t } = useTranslation('common')

  return (
    <div className="px-2 mb-2 w-full">
      <button
        onClick={() => showResumeAssistant.setState(true)}
        className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-linear-to-r from-blue-500 to-purple-800 text-white hover:opacity-90 transition-opacity"
        aria-label={t('assistant.open')}
      >
        <div className="flex items-center gap-2">
          <Briefcase size={24} />
          <span className="text-sm">{t('assistant.resumeAssistant')}</span>
        </div>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}
