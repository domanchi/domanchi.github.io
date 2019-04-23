VENV=blah

.PHONY: watch
watch: venv
	bundle exec jekyll serve --incremental

venv:
	virtualenv ${VENV}
	./scripts/setup-virtual-gems.sh ${VENV}